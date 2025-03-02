
# WebView2 Integration Guide

This guide explains how to integrate the React UI with your .NET Windows application using WebView2.

## Step 1: Build the React Application

1. Build the React application to generate static files:
   ```
   npm run build
   ```
   This will create a `dist` folder with all the static files (HTML, CSS, JS).

## Step 2: Set Up WebView2 in Your .NET Application

1. Install the WebView2 NuGet package in your Windows Forms or WPF project:
   ```
   Install-Package Microsoft.Web.WebView2
   ```

2. Create a folder in your .NET project for the React build output:
   ```
   YourProject/
   ├── WebResources/
   │   ├── index.html
   │   ├── assets/
   │   └── ...
   ```

3. Set these files as embedded resources in Visual Studio:
   - Right-click on each file/folder
   - Properties
   - Set "Build Action" to "Embedded Resource"

## Step 3: Load the React App in WebView2

Create a new Windows Forms application in Visual Studio with this complete MainForm.cs example:

```csharp
using System;
using System.IO;
using System.Text;
using System.Windows.Forms;
using System.Reflection;
using System.Text.Json;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

namespace TarkovSecureApp
{
    public partial class MainForm : Form
    {
        private WebView2 webView;
        private string sessionId;

        public MainForm()
        {
            InitializeComponent();
            
            // Set form properties
            this.Text = "Secure System";
            this.Size = new System.Drawing.Size(1280, 720);
            this.StartPosition = FormStartPosition.CenterScreen;
            
            // Initialize WebView async
            this.Load += MainForm_Load;
        }

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // MainForm
            // 
            this.ClientSize = new System.Drawing.Size(1280, 720);
            this.Name = "MainForm";
            this.ResumeLayout(false);
        }

        private async void MainForm_Load(object sender, EventArgs e)
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
                    "TarkovSecureApp");
                
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
                // Adjust "TarkovSecureApp.WebResources.index.html" to match your namespace
                var indexHtml = GetEmbeddedResource("TarkovSecureApp.WebResources.index.html");
                
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
```

## Step 4: Include Your React Build Files

When adding files to your Visual Studio project:

1. Make sure the namespace in `GetEmbeddedResource` matches your project's namespace
2. Verify that `TarkovSecureApp.WebResources.index.html` is the correct resource path for your embedded index.html
3. All JS and CSS files in the React build should also be embedded resources

## Step 5: Authentication Implementation

The WebView2 host will:
1. Process `AUTH_REQUEST` messages from the React app
2. Validate credentials (replace the simple check with your actual auth logic)
3. Return a token to the React app on successful login

The React app will:
1. Store the token in memory or localStorage
2. Use it for subsequent requests to the host application

## Step 6: Building the Final Executable

1. Set the MainForm as your startup form in Visual Studio
2. Build the project to create a standalone executable
3. The executable will display your React UI within the WebView2 control

## Troubleshooting

If you encounter issues:

1. Check that all React build files are correctly embedded as resources
2. Verify that the WebView2 runtime is installed on the target computer
3. Look for errors in the Visual Studio output window
4. Enable dev tools temporarily for debugging by setting `webView.CoreWebView2.Settings.AreDevToolsEnabled = true`

## Step 7: Testing the Communication

Test the integration by:
1. Sending test messages from the React UI to the .NET host
2. Verifying that responses are received and processed correctly
3. Testing the authentication flow
4. Checking that all UI components render correctly in WebView2

Use the existing `InteropContext` and related utility files in your React project to handle the communication with the WebView2 host.
