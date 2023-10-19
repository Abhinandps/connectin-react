

export async function requestPasswordReset(email: string) {
  try {
    const response = await fetch('http://localhost:3000/auth/request-password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });


    const data = await response.json();

    if (data.error) {
      throw new Error(data.message);
    }

    return data

  } catch (error: any) {

    throw (error.message);
  }

}

export async function verifyRequestReset(email: string, otp: number) {
  try {
    const response = await fetch('http://localhost:3000/auth/verify-request-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, otp })
    });


    const data = await response.json();

    if (data.error) {
      throw new Error(data.message);
    }

    return data

  } catch (error: any) {

    throw (error.message);
  }
}


export async function changePassword(email: string, newPassword: string, confirmNewPassword: string) {
  try {
    const response = await fetch('http://localhost:3000/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, newPassword, confirmNewPassword })
    });


    const data = await response.json();

    if (data.error) {
      throw new Error(data.message);
    }

    return data

  } catch (error: any) {

    throw (error.message);
  }
}


