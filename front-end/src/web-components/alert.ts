import { customElement, html, LitElement, property } from "lit-element";
import { ComponentPropsWithRef, FunctionComponent } from "react";

@customElement("vm-alert")
export class Alert extends LitElement {
  @property({ type: String })
  private type = "alert-info";

  public render() {
    return html`
      <div class="${this.wrapperClass}">
        <button type="button" class="close" aria-label="Close" @click="${this.handleDismiss}">
          <span aria-hidden="true">&nbsp;&times;</span>
        </button>
        <slot></slot>
      </div>
    `;
  }

  public createRenderRoot() {
    return this;
  }

  private get wrapperClass() {
    return "alert " + this.type;
  }

  private handleDismiss = (e: any) => {
    const event = new Event("dismiss");
    this.dispatchEvent(event);
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "vm-alert": any;
    }
  }
}
