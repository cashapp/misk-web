import axios, { AxiosRequestConfig } from "axios"

/**
 * Redux state initializer for network requests
 *
 * Example
 * state = {
 *   dinosaurs: initialResponseState()
 * }
 *
 * async componentDidMount() {
 *   this.setState({
 *     ...this.state,
 *     dinosaurs: await get(dinosaursUrl)
 *   })
 * }
 */
export const initialResponseState = () => {
  return {
    data: null as any,
    error: null as any,
  }
}

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
 *   this.setState({
 *     ...this.state,
 *     dinosaurs: await get(dinosaursUrl)
 *   })
 * }
 * render() {
 *   if (this.state.dinosaurs.data) {
 *     return <DinosaursView dinosaurs={this.state.dinosaurs.data} />
 *   }
 *   if (this.state.dinosaurs.error) {
 *     return <ErrorCalloutComponent error={this.state.dinosaurs.error} />
 *   }
 * }
 */
export const get = async (url: string, config: AxiosRequestConfig = {}) => {
  try {
    const { data } = await axios.get(url, config)
    return { data, error: null as any }
  } catch (error) {
    return { data: null as any, error }
  }
}
