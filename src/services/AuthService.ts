import api from "../api";

class AuthService {
  
  login(username: string, password: string) {
    return api
      .post("/login", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) localStorage.setItem("Authorization-Token", response.data.token);
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("Authorization-Token");
  }

  register(username: string, password: string) {
    return api
      .post("/register", {
        username,
        password
      });
  }

}

export default new AuthService();
