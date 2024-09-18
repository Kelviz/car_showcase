"use client"
import { UserDataProps } from "@/types";


export async function loginUser(userData: UserDataProps) {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${apiBaseUrl}/auth/login`
        try {
                const response = await fetch(url, {
                        method: "POST",
                        body: JSON.stringify({...userData}),
                        headers: {
                                'Content-Type': 'application/json',
                            },
                })

                const result = await response.json();
 
                if (result.status === 'success') {
                        
                        const {access_token, refresh_token} = result.data;
                        localStorage.setItem('access_token', access_token);
                        localStorage.setItem('refresh_token', refresh_token);
                        console.log("result:", result)
                        console.log("token after login:", access_token)
                        return result;
                        
                } else {
                        console.log("error message:", result)
                        return result
                }

        }catch (error) {
                console.error("Error message:", error);
                throw error;
              }        
}




export async function RegisterUser(userData: UserDataProps) {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${apiBaseUrl}/auth/register`
        try {
                const response = await fetch(url, {
                        method: "POST",
                        body: JSON.stringify({...userData}),
                        headers: {
                                'Content-Type': 'application/json',
                            },
                })

                const result = await response.json();
 
                if (result.status === 'success') {
                        console.log("result:", result)
                        return result;
                        
                } else {
                        console.log("error message:", result)
                        return result
                }

        }catch (error) {
                console.error("Error message:", error);
                throw error;
              }        
}


export async function refreshAccessToken(refreshToken: string) {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${apiBaseUrl}/auth/refresh-token/`;
        console.log("refresh token", refreshToken)

        try {
                const response = await fetch(url, {
                        method: "POST",
                        headers: {
                                'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({refresh_token: refreshToken})

                })

                const result = await response.json();

                if (response.ok && result.status === 'success') {
                        localStorage.setItem('access_token', result.access_token)
                        return result.access_token
                } else {
                        console.log("failed to refresh token", result.error)
                        return null
                }

        } catch (error) {
                console.error("Error refreshing token:", error)
                return null;
        }
}





export async function isAuthenticated() {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${apiBaseUrl}/auth/check-auth`
        console.log("my access token", localStorage.getItem('access_token'))
        const access_token = localStorage.getItem('access_token')
        const refresh_token = localStorage.getItem('refresh_token')
        try {
                const response = await fetch(url, {
                        method: "GET",
                        headers: {
                                'Authorization': `Bearer ${access_token}`,
                                'Content-Type': 'application/json',
                           },
                })
        
        
                if (response.status === 200) {
                        const data = await response.json()
                        console.log(data.message)
                        return true
                
                } else if (response.status === 401 && refresh_token) {
                        console.log("Refreshing expired access token")
                        const refreshed = await refreshAccessToken(refresh_token)
                        if (refreshed) {
                            
                                const response = await fetch(url, {
                                        method: "GET",
                                        headers: {
                                                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                                                'Content-Type': 'application/json',
                                        },
                                })
                                
                                
                                if (response.status === 200) {
                                        const data = await response.json()
                                        console.log(data.message)
                                        return true
                                
                                } else {
                                        console.log("Failed to authenticate with refreshed token");
                                        return false;
                                }
                        
                        }
                        
                }

                console.log("User is not authenticated");
                return false;
                             
        } catch (error) {
                console.error('Error checking authentication status:', error);
                return false;
              } 
 
      };

      

export function logOut() {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
}