import { customElement, html, LitElement, property } from "lit-element";
import { ComponentPropsWithRef, FunctionComponent } from "react";

@customElement("vm-alert")
export class Alert extends LitElement {
  @property()
  private type = "alert-info";

  @property()
  private message = "";

  public render() {
    return html`
      <div class="${this.wrapperClass}">
        ${this.message}
      </div>
    `;
  }

  public createRenderRoot() {
    return this;
  }

  private get wrapperClass() {
    return "alert " + this.type;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "vm-alert": any;
    }
  }
}
