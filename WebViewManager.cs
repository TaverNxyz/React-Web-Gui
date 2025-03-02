
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;
using System;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Windows.Forms;

namespace imperium.tech
{
    public class WebViewManager
    {
        private WebView2 webView;
        private string sessionId;
        private Form parentForm;

        public WebView2 WebView => webView;
        public string SessionId => sessionId;

        public WebViewManager(Form parent)
        {
            parentForm = parent;
            sessionId = Guid.NewGuid().ToString();
        }

        public async void Initialize()
        {
            try
            {
                // Create WebView2 control
                webView = new WebView2();
                webView.Dock = DockStyle.Fill;
                parentForm.Controls.Add(webView);

                // Initialize environment
                var userDataFolder = Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
                    "imperium.tech");
                
                var env = await CoreWebView2Environment.CreateAsync(
                    null, userDataFolder, null);
                
                await webView.EnsureCoreWebView2Async(env);

                // Add message handler
                webView.CoreWebView2.WebMessageReceived += WebView_WebMessageReceived;

                // Configure WebView settings
                webView.CoreWebView2.Settings.AreDevToolsEnabled = false;
                webView.CoreWebView2.Settings.AreDefaultContextMenusEnabled = false;
                webView.CoreWebView2.Settings.IsStatusBarEnabled = false;
                webView.CoreWebView2.Settings.IsWebMessageEnabled = true;
                
                // Load the React app
                LoadReactApp();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error initializing WebView2: {ex.Message}", "Error", 
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void LoadReactApp()
        {
            try
            {
                // The resource name follows the format: Namespace.Folder.File
                var indexHtml = ResourceHelper.GetEmbeddedResource("imperium.tech.WebResources.index.html");
                
                if (string.IsNullOrEmpty(indexHtml))
                {
                    MessageBox.Show("Could not load embedded index.html. Check resource name and build action.", 
                        "Resource Not Found", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return;
                }
                
                webView.NavigateToString(indexHtml);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error loading React app: {ex.Message}", "Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void WebView_WebMessageReceived(object sender, CoreWebView2WebMessageReceivedEventArgs e)
        {
            try
            {
                string message = e.WebMessageAsJson;
                
                // Parse the message
                using (JsonDocument doc = JsonDocument.Parse(message))
                {
                    var root = doc.RootElement;
                    string messageType = root.GetProperty("type").GetString();
                    
                    // Process different message types
                    switch (messageType)
                    {
                        case "CONNECT":
                            SendResponseToWebView("CONNECT", new { 
                                status = "connected", 
                                sessionId = this.sessionId 
                            });
                            break;
                            
                        case "AUTH_REQUEST":
                            AuthenticationManager.HandleAuthRequest(root, this);
                            break;
                            
                        case "HEARTBEAT":
                            SendResponseToWebView("HEARTBEAT", new { 
                                timestamp = DateTimeOffset.Now.ToUnixTimeMilliseconds() 
                            });
                            break;
                            
                        default:
                            Console.WriteLine($"Received message of type: {messageType}");
                            break;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error processing message: {ex.Message}");
            }
        }

        public void SendResponseToWebView(string messageType, object data)
        {
            var message = new
            {
                type = messageType,
                payload = data,
                timestamp = DateTimeOffset.Now.ToUnixTimeMilliseconds(),
                sessionId = this.sessionId
            };
            
            string jsonMessage = System.Text.Json.JsonSerializer.Serialize(message);
            webView.CoreWebView2.PostWebMessageAsJson(jsonMessage);
        }
    }
}
