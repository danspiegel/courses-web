import api from "../api";
import { CourseInterface } from "../interfaces/CourseInterface";

class CourseService {

  getHeaders() {
    return { 
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("Authorization-Token"),
        'Content-Type': 'application/json'
      }
    };
  }

  findAll() {
    return api
      .get("/courses", this.getHeaders())
      .then(response => response.data)
      .catch(err => err.message);
  }

  findById(id: number) {
    return api
      .get(`/courses/${id}`, this.getHeaders())
      .then(response => response.data)
      .catch(err => err.message);
  }

  createCourse(course: CourseInterface) {
    return api
      .post("/courses", JSON.stringify(course), this.getHeaders());
  }

  updateCourse(id: number, course: CourseInterface) {
    return api
      .put(`/courses/${id}`, JSON.stringify(course), this.getHeaders());
  }

  deleteCourse(id: number) {
    return api
      .delete(`/courses/${id}`, this.getHeaders());
  }

}

export default new CourseService();
