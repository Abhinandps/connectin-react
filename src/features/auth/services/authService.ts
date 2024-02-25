import apiCall from "../../../services/apiCall";


export async function requestPasswordReset(email: string) {
  try {
    // const response = await fetch('https://serverapponline.cloud/auth/request-password-reset', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ email })
    // });


    // const data = await response.json();

    const data = await apiCall({
      url: `/auth/request-password-reset`,
      method: 'POST',
      data: JSON.stringify({ email })
    })

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
    // const response = await fetch('https://serverapponline.cloud/auth/verify-request-reset', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ email, otp })
    // });


    // const data = await response.json();

    const data = await apiCall({
      url: `/auth/verify-request-reset`,
      method: 'POST',
      data: JSON.stringify({ email, otp })
    })

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
    // const response = await fetch('https://serverapponline.cloud/auth/change-password', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ email, newPassword, confirmNewPassword })
    // });


    // const data = await response.json();

    const data = await apiCall({
      url: `/auth/change-password`,
      method: 'POST',
      data: JSON.stringify({ email, newPassword, confirmNewPassword })
    })

    if (data.error) {
      throw new Error(data.message);
    }

    return data

  } catch (error: any) {

    throw (error.message);
  }
}




