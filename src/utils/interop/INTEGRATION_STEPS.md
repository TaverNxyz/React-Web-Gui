
# Integration Steps for Windows Forms Application

## Step 1: Required NuGet Packages

Install these NuGet packages in your Windows Forms project:
```
Install-Package Microsoft.Web.WebView2
Install-Package System.Text.Json
```

## Step 2: Project Structure

Create these folders in your .NET project:
- WebResources (for React build files)
- Resources (for splash screen and other images)

## Step 3: Add Splash Screen Image

1. Add your splash screen image to the Resources folder
2. Set its Build Action to "Embedded Resource"
3. The resource path should be "YourNamespace.Resources.splash.png"

## Step 4: React App Build

1. Run `npm run build` to generate the React build files
2. Copy the build files (index.html and assets) to the WebResources folder
3. Set all these files to have Build Action "Embedded Resource"

## Step 5: Configure Resource Names

If your namespace is not "imperium.tech", modify these resource paths in MainForm.cs:
- `imperium.tech.Resources.splash.png`
- `imperium.tech.WebResources.index.html`

## Step 6: Build and Run

Build and run your application. The MainForm will:
1. Show the splash screen
2. Initialize WebView2 after a delay
3. Load your React app from embedded resources
4. Handle communication between React and .NET

## Troubleshooting

1. If resources aren't found, check:
   - Correct namespace in resource paths
   - Build Action is set to "Embedded Resource"
   - Files are actually in your project
   
2. If WebView2 fails to initialize:
   - Ensure WebView2 Runtime is installed
   - Check error messages in console output
