
using System;
using System.IO;
using System.Reflection;
using System.Linq;

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
                    Console.WriteLine($"Resource not found: {resourceName}");
                    Console.WriteLine("Available resources:");
                    foreach (var name in resourceNames)
                    {
                        Console.WriteLine($"  - {name}");
                    }
                    
                    // Try to find a close match for resourceName
                    var possibleMatches = resourceNames
                        .Where(name => name.EndsWith(resourceName.Split('.').Last()))
                        .ToList();
                    
                    if (possibleMatches.Any())
                    {
                        Console.WriteLine("Possible matches:");
                        foreach (var match in possibleMatches)
                        {
                            Console.WriteLine($"  - {match}");
                        }
                    }
                    
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
                Console.WriteLine($"Error getting resource {resourceName}: {ex.Message}");
                return null;
            }
        }
    }
}
