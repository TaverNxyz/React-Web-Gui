
using System;
using System.IO;
using System.Reflection;
using System.Linq;
using System.Text;

namespace imperium.tech
{
    public static class ResourceHelper
    {
        public static string GetEmbeddedResource(string resourceName)
        {
            try
            {
                var assembly = Assembly.GetExecutingAssembly();
                
                // Debug: Check if the resource exists
                var resourceNames = assembly.GetManifestResourceNames();
                var exists = resourceNames.Contains(resourceName);
                
                if (!exists)
                {
                    StringBuilder errorMessage = new StringBuilder();
                    errorMessage.AppendLine($"RESOURCE NOT FOUND: {resourceName}");
                    errorMessage.AppendLine("---------------------------------------------------");
                    errorMessage.AppendLine("AVAILABLE RESOURCES:");
                    
                    foreach (var name in resourceNames.OrderBy(n => n))
                    {
                        errorMessage.AppendLine($"  - {name}");
                    }
                    
                    // Try to find a close match for resourceName
                    var lastSegment = resourceName.Split('.').Last();
                    var possibleMatches = resourceNames
                        .Where(name => name.EndsWith(lastSegment, StringComparison.OrdinalIgnoreCase) || 
                                      name.Contains(lastSegment))
                        .ToList();
                    
                    if (possibleMatches.Any())
                    {
                        errorMessage.AppendLine("---------------------------------------------------");
                        errorMessage.AppendLine("POSSIBLE MATCHES:");
                        foreach (var match in possibleMatches.OrderBy(m => m))
                        {
                            errorMessage.AppendLine($"  - {match}");
                        }
                    }
                    
                    // Suggest how to fix namespace issues
                    if (resourceName.StartsWith("imperium.tech.") && 
                        !resourceNames.Any(n => n.StartsWith("imperium.tech.")))
                    {
                        errorMessage.AppendLine("---------------------------------------------------");
                        errorMessage.AppendLine("NAMESPACE MISMATCH DETECTED:");
                        errorMessage.AppendLine("Your code is looking for resources with namespace 'imperium.tech' but none were found.");
                        errorMessage.AppendLine("Please check your actual namespace and update resource paths in the code.");
                        
                        // Try to detect the actual namespace
                        var distinctNamespaces = resourceNames
                            .Select(n => n.Split('.').FirstOrDefault())
                            .Where(n => !string.IsNullOrEmpty(n))
                            .Distinct()
                            .ToList();
                        
                        if (distinctNamespaces.Any())
                        {
                            errorMessage.AppendLine("Detected namespaces in current assembly:");
                            foreach (var ns in distinctNamespaces)
                            {
                                errorMessage.AppendLine($"  - {ns}");
                            }
                        }
                    }
                    
                    // Check if the WebResources folder exists in any namespace
                    var hasWebResourcesFolder = resourceNames
                        .Any(n => n.Contains(".WebResources."));
                    
                    if (!hasWebResourcesFolder)
                    {
                        errorMessage.AppendLine("---------------------------------------------------");
                        errorMessage.AppendLine("NO WEBRESOURCES FOLDER DETECTED:");
                        errorMessage.AppendLine("Make sure you have:");
                        errorMessage.AppendLine("1. Created a 'WebResources' folder in your project");
                        errorMessage.AppendLine("2. Added your web files to this folder");
                        errorMessage.AppendLine("3. Set all files to have 'Build Action: Embedded Resource'");
                        errorMessage.AppendLine("4. Included all files in the project (right-click files, select 'Include In Project')");
                    }
                    
                    var errorOutput = errorMessage.ToString();
                    Console.WriteLine(errorOutput);
                    
                    // Also show a message box for immediate visibility
                    System.Windows.Forms.MessageBox.Show(
                        errorOutput,
                        "Resource Not Found",
                        System.Windows.Forms.MessageBoxButtons.OK,
                        System.Windows.Forms.MessageBoxIcon.Error);
                    
                    return null;
                }
                
                using (var stream = assembly.GetManifestResourceStream(resourceName))
                {
                    if (stream == null) return null;
                    using (var reader = new StreamReader(stream))
                    {
                        return reader.ReadToEnd();
                    }
                }
            }
            catch (Exception ex)
            {
                var errorMessage = $"Error getting resource {resourceName}: {ex.Message}\n{ex.StackTrace}";
                Console.WriteLine(errorMessage);
                System.Windows.Forms.MessageBox.Show(
                    errorMessage,
                    "Resource Error",
                    System.Windows.Forms.MessageBoxButtons.OK,
                    System.Windows.Forms.MessageBoxIcon.Error);
                return null;
            }
        }
    }
}
