
import { customElement, html, LitElement, property } from "lit-element";

@customElement("vm-input")
export class Input extends LitElement {
  @property({ type: String })
  private value = "";

  public render() {
    return html`
      <input
        id="input"
        @input="${this.handleChange}"
        @change="${this.handleChange}"
        .value="${this.value}"
        class="form-control"
      >
    `;
  }

  public createRenderRoot() {
    return this;
  }

  private handleChange = (e: any) => {
    const event = new Event("input");
    this.value = e.target.value;
    this.dispatchEvent(event);
  }
}
