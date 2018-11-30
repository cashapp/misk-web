/// <reference types="react" />
/**
 * <TextHTMLOrElementComponent length={35}>{<div>item</div>}</TextHTMLOrElementComponent>
 * <TextHTMLOrElementComponent length={35}>{"Test"} </TextHTMLOrElementComponent>
 * <TextHTMLOrElementComponent length={35}>{'<a href="http://squareup.com/">Test</a>'} </TextHTMLOrElementComponent>
 *
 * Renders passed in text, HTML-parseable string, or React element with optional length constraints for text.
 */
export interface ITextHTMLOrElementProps {
    children: string | Element | JSX.Element;
}
export declare const TextHTMLOrElementComponent: (props: ITextHTMLOrElementProps) => JSX.Element;
