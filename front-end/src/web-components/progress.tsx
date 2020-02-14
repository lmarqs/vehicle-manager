import { customElement, html, LitElement, property } from "lit-element";
import src from "./ProgressIndicator.gif";

@customElement("vm-progress")
export class Progress extends LitElement {

  @property({ type: Number })
  private size = "";

  public render() {
    return html`<img alt="..." src=${src} size=${this.size} />`;
  }

  public createRenderRoot() {
    return this;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "vm-progress": any;
    }
  }
}
