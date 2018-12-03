import * as React from 'react';
import axios from 'axios';
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { StyledRow } from '../StyledReactstrap/StyledReactstrip';

type Props = {};
type State = {
  indicator: string;
  answerYear: number | undefined;
  answerValue: number | undefined;
  error: string | undefined;
};

class Question2B extends React.Component<Props, State> {
  static defaultProps = {};
  state = {
    indicator: 'EN.ATM.CO2E.KT',
    answerYear: undefined,
    answerValue: undefined,
    error: undefined
  };

  /**
   * @type string - api url
   */
  private url: string = '/get-year-with-highest-value-of-indicator';

  /**
   * Handle change event when indicator input be changed
   */
  private onIndicatorChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ indicator: event.currentTarget.value });
  };

  /**
   * Handle click event when Reset button be clicked
   */
  private onResetClick = (): void => {
    this.setState({
      indicator: 'EN.ATM.CO2E.KT',
      answerYear: undefined,
      answerValue: undefined,
      error: undefined
    });
  };

  /**
   * Handle click event when Get button be clicked
   */
  private onGetClick = (): void => {
    const url = `${this.url}/${this.state.indicator}`;

    axios
      .get(url)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        console.log(data);
        this.setState({
          answerYear: data.data.year,
          answerValue: data.data.averageValue,
          error: undefined
        });
      })
      .catch((reason:Error) => {
        this.setState({
          answerYear: undefined,
          answerValue: undefined,
          error: reason.message
        })
      });

  };
  render() {
    return (
      <Container>
        <StyledRow>
          <Col xs="12">
            <p>
              The year with the highest "CO2 emissions (kt)", averaged across each country for which data is available.
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
        {this.state.answerYear && this.state.answerValue && (
          <Container>
            <StyledRow>
              <Col xs="4">
                <h1>Result:</h1>
              </Col>
            </StyledRow>
            <StyledRow>
              <Col xs="12">
                <h1>Year: {this.state.answerYear}</h1>
              </Col>
            </StyledRow>
            <StyledRow>
              <Col xs="12">
                <h1>AvgValue: {this.state.answerValue}</h1>
              </Col>
            </StyledRow>
          </Container>
        )}
        {this.state.error && (
          <StyledRow>
            <Col xs="8">
              <h1>{this.state.error}</h1>
            </Col>
          </StyledRow>
        )}
      </Container>
    );
  }
}

export default Question2B;
