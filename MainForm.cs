
using System;
using System.IO;
using System.Text;
using System.Windows.Forms;
using System.Drawing;
using System.Reflection;
using System.Text.Json; // Required for JSON handling
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

namespace imperium.tech
{
    public partial class MainForm : Form
    {
        private WebView2 webView;
        private string sessionId;
        private PictureBox splashBox;
        private Timer splashTimer;

        public MainForm()
        {
            InitializeComponent();
            
            // Set form properties
            this.Text = "Secure System";
            this.Size = new System.Drawing.Size(1280, 720);
            this.StartPosition = FormStartPosition.CenterScreen;
            
            // Show splash screen first
            ShowSplashScreen();
            
            // Initialize WebView after splash (with timer)
            splashTimer = new Timer();
            splashTimer.Interval = 2500; // 2.5 seconds
            splashTimer.Tick += (s, e) => {
                splashTimer.Stop();
                splashBox.Visible = false;
                this.Controls.Remove(splashBox);
                splashBox.Dispose();
                InitializeWebView();
            };
            splashTimer.Start();
        }

        // Note: DO NOT implement InitializeComponent here
        // It will be auto-generated in MainForm.Designer.cs

        private void ShowSplashScreen()
        {
            try {
                // Load splash image from embedded resources
                using (var stream = Assembly.GetExecutingAssembly().GetManifestResourceStream("imperium.tech.Resources.splash.png"))
                {
                    if (stream != null)
                    {
                        var splashImage = Image.FromStream(stream);
                        splashBox = new PictureBox();
                        splashBox.Dock = DockStyle.Fill;
                        splashBox.SizeMode = PictureBoxSizeMode.Zoom;
                        splashBox.Image = splashImage;
                        this.Controls.Add(splashBox);
                        splashBox.BringToFront();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading splash: {ex.Message}");
                // If splash fails, init WebView immediately
                InitializeWebView();
            }
        }

        private async void InitializeWebView()
        {
            try
            {
                // Create WebView2 control
                webView = new WebView2();
                webView.Dock = DockStyle.Fill;
                this.Controls.Add(webView);

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
                
                // Generate unique session ID
                sessionId = Guid.NewGuid().ToString();

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
                var indexHtml = GetEmbeddedResource("imperium.tech.WebResources.index.html");
                
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
                            HandleAuthRequest(root);
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

        private void HandleAuthRequest(JsonElement message)
        {
            try
            {
                var payload = message.GetProperty("payload");
                string username = payload.GetProperty("username").GetString();
                string password = payload.GetProperty("password").GetString();
                
                bool isAuthenticated = AuthenticateUser(username, password);
                
                if (isAuthenticated)
                {
                    // Generate an auth token (this is a simplified example)
                    string token = Convert.ToBase64String(
                        Encoding.UTF8.GetBytes($"{username}:{Guid.NewGuid()}:{DateTimeOffset.Now.AddHours(1).ToUnixTimeSeconds()}"));
                    
                    SendResponseToWebView("AUTH_RESPONSE", new
                    {
                        success = true,
                        token = token,
                        expiresAt = DateTimeOffset.Now.AddHours(1).ToUnixTimeMilliseconds(),
                        username = username
                    });
                }
                else
                {
                    SendResponseToWebView("AUTH_RESPONSE", new
                    {
                        success = false,
                        errorMessage = "Invalid credentials"
                    });
                }
            }
            catch (Exception ex)
            {
                SendResponseToWebView("AUTH_RESPONSE", new
                {
                    success = false,
                    errorMessage = $"Authentication error: {ex.Message}"
                });
            }
        }

        private bool AuthenticateUser(string username, string password)
        {
            // In a real implementation, check against your user database
            // This is a simple example
            return username == "admin" && password == "password";
        }

        private void SendResponseToWebView(string messageType, object data)
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

        private string GetEmbeddedResource(string resourceName)
        {
            var assembly = Assembly.GetExecutingAssembly();
            using (var stream = assembly.GetManifestResourceStream(resourceName))
            {
                if (stream == null) return null;
                using (var reader = new StreamReader(stream))
                {
                    return reader.ReadToEnd();
                }
            }
        }
    }
}
