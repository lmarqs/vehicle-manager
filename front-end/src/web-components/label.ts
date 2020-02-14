

import { customElement, html, LitElement, property } from "lit-element";

@customElement("vm-label")
export class Label extends LitElement {
  @property({ type: String })
  private for = "";

  public render() {
    return html`<label .for="${this.for}"></label>`;
  }

  public createRenderRoot() {
    return this;
  }
}
