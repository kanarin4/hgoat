export async function submitGoatReport(formData) {
    try {
      console.log("Submitting Goat Report:", formData);
  
      // Simulating an API request (Replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      return { success: true };
    } catch (error) {
      console.error("Error submitting goat report:", error);
      return { success: false, error };
    }
  }