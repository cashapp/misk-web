import { AxiosRequestConfig } from "axios";
/**
 * Redux state initializer for network requests
 *
 * Example
 * state = {
 *  dinosaurs: initialResponseState()
 * }
 *
 * async componentDidMount() {
 *  this.setState({
 *    ...this.state,
 *    dinosaurs: await get(dinosaursUrl)
 *  })
 * }
 */
export declare const initialResponseState: () => {
    data: any;
    error: any;
};
/**
 *
 * @param url
 * @param config: optional request config
 *
 * Wrapper that async returns a combined data + error object
 * This allows for one line network requests with error handling
 *
 * Example
 * async componentDidMount() {
 *  this.setState({
 *    ...this.state,
 *    dinosaurs: await get(dinosaursUrl)
 *  })
 * }
 *
 * render() {
 *  if (this.state.dinosaurs.data) {
 *    render(<DinosaursView dinosaurs={this.state.dinosaurs.data}/>)
 *  }
 * if (this.state.dinosaurs.error) {
 *    render(<ErrorCalloutComponent error={this.state.dinosaurs.error}/>)
 *  }
 * }
 */
export declare const get: (url: string, config?: AxiosRequestConfig) => Promise<{
    data: any;
    error: any;
}>;
