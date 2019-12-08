import React, { Component } from "react";
import firebase, { auth, db } from "./firebase";
import CourseDetails from "./CourseDetails";
import CourseListingsTable from "./CourseListingsTable";
import TopicForm from "./TopicForm";

class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_topic: null,
      selected_course: null,
      showCourseDetailsModal: false,
      coursesForTopic: []
    };
  }

  showCourseDetails() {
    this.setState({ showCourseDetailsModal: true });
  }

  hideCourseDetails() {
    this.setState({ showCourseDetailsModal: false });
  }

  setSelectedTopic(topic) {
    //console.log("Catalog.setSelectedTopic() " + topic);
    this.getCoursesForTopic(topic);
    this.setState({
      selected_topic: topic,
      selected_course: null
    });
  }

  courseClickHandler(course) {
    this.setState({
      selected_course: course
    });
    this.showCourseDetails();
  }

  getCoursesForTopic(topic) {
    let matchingCourses = [];

    if (topic === "PVP") {
      matchingCourses.push({
        class_id: "PvP",
        description: "This class teaches how to become a pro PvP in anything.",
        name: "PvP 902",
        short_summary: "Become a PvP pro",
        teacher: "Skeppy",
        record_id: "PvP902"
      });
    } else if (topic === "math") {
      matchingCourses.push(
        {
          class_id: "MATH101",
          description: "This class teaches basic arithmetic",
          name: "MATH 101",
          short_summary: "Basic Arithmetic",
          teacher: "Addison Adding",
          record_id: "MATH101"
        },
        {
          class_id: "MATH201",
          description: "This class teaches basic algebra",
          name: "MATH 201",
          short_summary: "Basic Algebra",
          teacher: "Beth Bracket",
          record_id: "MATH201"
        }
      );
    } else if (topic === "technology") {
      matchingCourses.push({
        class_id: "CS101",
        description: "This class teaches the basics computer programming.",
        name: "CS 101",
        short_summary: "Introduction to Programming",
        teacher: "Tieu Luu",
        record_id: "CS101"
      });
    } else if (topic === "writing") {
      matchingCourses.push({
      class_id: "Writing101",
      description: "This class teaches basic writing skills",
      name: "Writing101"
      short_summary: "Intro to Writing",
      teacher: "Toby Chalupa",
      record_id: "Writing101"
      });
    } else if (topic === "Roblox") {
      matchingCourses.push({
        class_id: "RobloxScamming",
        description: "This class teaches the basics of roblox and how to scam the noobs.",
        name: " Roblox Scamming",
        short_summary: "Introduction to Roblox Scamming",
        teacher: "KingFila,
        record_id: "RobloxScamming
    }

    this.setState({ coursesForTopic: matchingCourses });
  }

  render() {
    return (
      <div className="catalog">
        <div className="home-page-banner"> Course Catalog </div>
        <TopicForm submitHandler={topic => this.setSelectedTopic(topic)} />
        <CourseListingsTable
          coursesForTopic={this.state.coursesForTopic}
          courseClickHandler={course => this.courseClickHandler(course)}
        />
        <CourseDetails
          getUser={() => this.props.getUser()}
          selectedCourse={this.state.selected_course}
          showModal={this.state.showCourseDetailsModal}
          hideModalHandler={() => this.hideCourseDetails()}
        />
      </div>
    );
  }
}

export default Catalog;
