// API Check Script
// This script tests the NotTofu API endpoints directly

async function checkAPI() {
  try {
    console.log('Testing API endpoints...');
    
    // Test the root endpoint
    console.log('\nTesting root endpoint:');
    const rootResponse = await fetch('http://localhost:8000/');
    const rootData = await rootResponse.json();
    console.log('Status:', rootResponse.status);
    console.log('Data:', rootData);
    
    // Test the test-runs endpoint
    console.log('\nTesting test-runs endpoint:');
    const runsResponse = await fetch('http://localhost:8000/test-runs/');
    const runsData = await runsResponse.json();
    console.log('Status:', runsResponse.status);
    console.log('Number of test runs:', runsData.length);
    console.log('First test run:', runsData[0]);
    
    // Test a specific test run if available
    if (runsData.length > 0) {
      const testRunId = runsData[0].id;
      console.log(`\nTesting specific test run endpoint (ID: ${testRunId}):`);
      const singleRunResponse = await fetch(`http://localhost:8000/test-runs/${testRunId}`);
      const singleRunData = await singleRunResponse.json();
      console.log('Status:', singleRunResponse.status);
      console.log('Data:', singleRunData);
      
      // Test phases for the test run
      console.log(`\nTesting test phases endpoint for run ${testRunId}:`);
      const phasesResponse = await fetch(`http://localhost:8000/test-runs/${testRunId}/phases`);
      const phasesData = await phasesResponse.json();
      console.log('Status:', phasesResponse.status);
      console.log('Number of phases:', phasesData.length);
      if (phasesData.length > 0) {
        console.log('First phase:', phasesData[0]);
      }
    }
    
    console.log('\nAPI tests completed successfully.');
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

// Run the check
checkAPI(); 