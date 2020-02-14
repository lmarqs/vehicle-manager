import { customElement, html, LitElement, property } from "lit-element";

@customElement("vm-alert")
export class Label extends LitElement {

  private get $input() {
    return this.shadowRoot!.getElementById("input")! as HTMLInputElement;
  }
  @property({ type: String })
  private type = "alert-info";

  @property({ type: String })
  private message = "";

  public render() {
    return html`
      <div class="${this.wrapperClass}">
        <button type="button" class="close" aria-label="Close" @click="${this.handleDismiss}">
          <span aria-hidden="true">&nbsp;&times;</span>
        </button>
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

  private handleDismiss = (e: any) => {
    const event = new Event("dismiss");
    this.dispatchEvent(event);
  }
}
