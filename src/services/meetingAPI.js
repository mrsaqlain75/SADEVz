const API_BASE_URL = 'http://localhost:5000/api';

export const meetingAPI = {
  async scheduleMeeting(meetingData) {
    const response = await fetch(`${API_BASE_URL}/meetings/schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meetingData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to schedule meeting');
    }
    
    return response.json();
  }
};