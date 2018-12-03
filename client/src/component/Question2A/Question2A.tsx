import * as React from 'react';
import { Container, InputGroup, InputGroupAddon, InputGroupText, Input, Col, Button } from 'reactstrap';
import { StyledRow } from '../StyledReactstrap/StyledReactstrip';
import axios from 'axios';

type Props = {};
type State = {
  indicator: string;
  startYear: number;
  endYear: number;
  answer: string | undefined;
};

class Question2A extends React.Component<Props, State> {
  static defaultProps = {};
  state = {
    indicator: 'SP.POP.GROW',
    startYear: 1980,
    endYear: 1990,
    answer: undefined
  };
  /**
   * @type string - api url
   */
  private url: string = '/get-country-with-highest-avg-value-of-indicator-in-period';

  /**
   * Handle change event when indicator input be changed
   */
  private onIndicatorChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ indicator: event.currentTarget.value });
  };

  /**
   * Handle change event when start year input be changed
   */
  private onStartYearChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ startYear: Number(event.currentTarget.value) });
  };

  /**
   * Handle change event when End year input be changed
   */
  private onEndYearChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ endYear: Number(event.currentTarget.value) });
  };

  /**
   * Handle click event when Reset button be clicked
   */
  private onResetClick = (): void => {
    this.setState({
      indicator: 'SP.POP.GROW',
      startYear: 1980,
      endYear: 1990,
      answer: undefined
    });
  };

  /**
   * Handle click event when Get button be clicked
   */
  private onGetClick = (): void => {
    const url = `${this.url}/${this.state.indicator}?start=${this.state.startYear}&end=${this.state.endYear}`;
    axios
      .get(url)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        console.log(data);
        this.setState({
          answer: data.data.name
        });
      });
  };

  render() {
    return (
      <Container>
        <StyledRow>
          <Col xs="12">
            <p>
              The country with the highest average "Urban population growth (annual %)" between 1980 and 1990. Exclude
              countries where any data entry for this time range is missing.
            </p>
          </Col>
        </StyledRow>
        <StyledRow>
          <Col xs="12">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Indicator Code</InputGroupText>
              </InputGroupAddon>
              <Input value={this.state.indicator} onChange={this.onIndicatorChange} />
            </InputGroup>
          </Col>
        </StyledRow>
        <StyledRow>
          <Col xs="6">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Start Year</InputGroupText>
              </InputGroupAddon>
              <Input type="number" value={this.state.startYear} onChange={this.onStartYearChange} />
            </InputGroup>
          </Col>
          <Col xs="6">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>End Year</InputGroupText>
              </InputGroupAddon>
              <Input type="number" value={this.state.endYear} onChange={this.onEndYearChange} />
            </InputGroup>
          </Col>
        </StyledRow>
        <StyledRow>
          <Col xs="6">
            <Button color="primary" onClick={this.onGetClick}>
              Get
            </Button>
          </Col>
          <Col xs="6">
            <Button color="secondary" onClick={this.onResetClick}>
              Reset
            </Button>
          </Col>
        </StyledRow>
        {this.state.answer && (
          <StyledRow>
            <Col xs="4">
              <h1>Result:</h1>
            </Col>
            <Col xs="8">
              <h1>{this.state.answer}</h1>
            </Col>
          </StyledRow>
        )}
      </Container>
    );
  }
}

export default Question2A;
