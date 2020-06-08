/* eslint-disable no-unused-vars */
/* eslint-disable no-multi-str */
/* eslint-disable no-console */
/* eslint no-console: "error" */
import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DatePicker } from "antd";
import moment from "moment";
import Image from "react-bootstrap/Image";
import { Editor } from "@tinymce/tinymce-react";
import serialize from "form-serialize";
import axios from "axios";
const dateFormat = "YYYY/MM/DD";


class CreateMilestone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      projectName: "",
      startDate : "",
      dateEnd: "",
      success: "",
      error: ""
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  // handleEditorChange(e) {
  //   this.setState({ description: e.target.getContent() });
  // }
  handleChange(e){
    const {name , value} = e.target.name
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClick(e) {
    e.preventDefault();
    const fd = {
      projectName: this.state.projectName,
      dateStart : this.state.startDate,
      dateEnd: this.state.dateEnd,
      description: this.state.description
    };
    // Make api call with form
    axios
      .post("http://localhost:4000/milestones", fd)
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          this.setState({
            success: "User Successfully created!",
            projectName: ""
          });
          /*  this.setState({ data: data});*/
        } else {
          this.setState({ error: "Error creating User" });
        }
      })
      .catch((error) => console.log(error));
  }
  render() {
    const success = this.state.success;
    const error = this.state.error;
    return (
      <Card.Body>
        {success ? (
          <Form.Text className="text-bold text-success">{success}</Form.Text>
        ) : (
          <Form.Text className="text-bold text-danger">{error}</Form.Text>
        )}
        <div className="content-text">
          <h5>Add Milestones to Funds Application</h5>
        </div>
        <Row>
          
          <Col md="12">
            <form name="create-mileston" id="createMilestones">
              <div class="form-row" controlId="applicationId">
                <div class="form-group col-md-12">
                  <label for="inputTeam">Select Application</label>
                  <select
                    id="inputState"
                    class="form-control"
                    value={this.state.projectName}
                    onChange={this.handleChange}
                    name="projectName"
                  >
                    <option selected>Choose...</option>
                    <option>Fertilizer Distribution</option>
                    <option>Maize Farming</option>
                    <option>Project 1</option>
                    <option>Project 2</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div>
                  <label>Start Date</label>
                  <DatePicker id= "startDate"
                    name = "startDate"
                    value = {this.state.startDate}
                    onChange = {this.handleChange}
                    format = {dateFormat}
                    defaultValue = {moment("2020/01/01", dateFormat)} />
                </div>
                {/* <div class="form-group col-md-6" controlId="startDate">
                  <label for="startDate">Start Date</label>
                  <DatePicker
                    id="startDate"
                    defaultValue={moment("2020/01/01", dateFormat)}
                    value={this.state.dateStart}  
                    name="dateStart"
                    format={dateFormat}
                    onChange={this.handleChange}
                  />
                </div>
                <div class="form-group col-md-6" controlId="endDate">
                  <label for="endDate">End Date</label>
                  <DatePicker
                    id="endDate"
                    value={this.state.dateEnd}
                    name="dateEnd"
                    defaultValue={moment("2020/01/01", dateFormat)}
                    format={dateFormat}
                    onChange={this.handleChange}
                  />
                </div> */}
              </div>
              <Form.Label>Description</Form.Label>
              <Editor
                apiKey="oym93hgea69gv4o5cjoxfc1baobo49f82d4ah9j66v3n955r"
                name="description"
                value={this.state.description}
                init={{
                  height: 200,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image",
                    "charmap print preview anchor help",
                    "searchreplace visualblocks code",
                    "insertdatetime media table paste wordcount"
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic | \
                    alignleft aligncenter alignright | \
                    bullist numlist outdent indent | help"
                }}
                onChange={this.handleChange}
              />
              <br></br>
              <Button variant="primary" type="submit" onClick={this.handleClick}>
                Create Milestone
              </Button>
            </form>
          </Col>
        </Row>
      </Card.Body>
    );
  }
}
export default CreateMilestone;
