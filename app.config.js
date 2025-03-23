module.exports = () => {
    // Force isDev to true during development
    const isDev = true; // Will adjust for production later
    return {
      name: 'aurora-baby-mobile',
      version: '1.0.0',
      extra: {
        firebaseApiKey: 'AIzaSyC5xeeWjT3XpPMPamhSc748D9Bbif0RhzM',
        firebaseAuthDomain: 'aurora-baby-mobile.firebaseapp.com',
        firebaseProjectId: 'aurora-baby-mobile',
        firebaseStorageBucket: 'aurora-baby-mobile.firebasestorage.app',
        firebaseMessagingSenderId: '450824864919',
        firebaseAppId: '1:450824864919:web:39dc697565b309cb4ed5d2',
        firebaseMeasurementId: 'G-DF2KM62PL6',
        isDev: isDev
      }
    };
  };