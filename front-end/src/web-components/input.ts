
import { customElement, html, LitElement, property } from "lit-element";

@customElement("vm-input")
export class Input extends LitElement {
  @property()
  private type = "";

  @property()
  private label = "";

  @property()
  private value = "";

  @property()
  private hasError = "";

  @property()
  private error = "";

  @property()
  private readonly = false;

  public render() {
    return html`
    <div class="${this.wrapperClass}">
      <label class="control-label">${this.label}</label>
      <input
        .type="${this.type}"
        @input="${this.handleChange}"
        @change="${this.handleChange}"
        .value="${this.value}"
        ?readonly="${this.readonly}"
        class="form-control"
      >
      ${this.hasError && this.error && (
        html`<p className="help-block">${this.error}</p>`
      )}
    </div>
    `;
  }

  public createRenderRoot() {
    return this;
  }

  private get wrapperClass() {
    return "form-group " + (this.hasError === "true" ? "has-error" : "");
  }

  private handleChange = (e: any) => {
    const event = new Event("input");
    this.value = e.target.value;
    this.dispatchEvent(event);
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "vm-input": any;
    }
  }
}
