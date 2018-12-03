import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Question2A from './component/Question2A/Question2A';
import Question2B from './component/Question2B/Question2B';
import axios from 'axios';

type State = {
  question: string;
};
class App extends Component<{}, State> {
  state = {
    question: '2A'
  };

  onButtonClick = (question: string) =>{
    this.setState({
      question: question
    })
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Developer Exercise</h1>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <Button color={this.state.question === '2A' ? 'primary' : 'secondary'} size="lg" block onClick={() => {this.onButtonClick('2A')}}>
              2A
            </Button>
          </Col>
          <Col xs="6">
            <Button color={this.state.question === '2B' ? 'primary' : 'secondary'} size="lg" block onClick={() => {this.onButtonClick('2B')}}>
              2B
            </Button>
          </Col>
        </Row>
        <Row>{this.state.question === '2A' ? <Question2A /> : <Question2B />}</Row>
      </Container>
    );
  }
}

export default App;
