import { AbstractVehicle, VehicleType } from "@vehicle-manager/api";
import React from "react";
import ReactDOM from "react-dom";
import { RouteComponentProps } from "react-router-dom";
import validate from "validate.js";
import { apiClient } from "../apiClient";

interface Params {
  id?: string;
}

type Props = RouteComponentProps<Params>;

interface State extends AbstractVehicle {
  errors?: any;
  loading?: boolean;
  submitted?: boolean;
  submitting?: boolean;
}

export const constraints = {
  chassisSeries: {
    presence: true,
    format: {
      pattern: /[a-zA-Z0-9\-]+$/,
      message: "^%{num} is not a valid chassis series",
    },
  },
  chassisNumber: {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThanOrEqualTo: 0,
    },
  },
  type: {
    presence: true,
  },
  color: {
    presence: true,
  },
};

export class FormPage extends React.Component<Props, State> {
  public state: State = {};
  private typeInput = React.createRef<HTMLElement>();

  public render() {
    const { _id, submitted, submitting, errors } = this.state;

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {_id ? "Add a Vehicle" : "Editing a Vehicle"}
        </div>
        <div className="panel-body">
          <form name="form" onSubmit={this.handleSubmit}>
            <vm-input
              error={errors?.chassisSeries}
              hasError={submitted && errors?.chassisSeries}
              label="Chassis Series"
              onInput={this.handleChassisSeriesChange}
              readonly={_id}
              value={this.state.chassisSeries}
            />
            <vm-input
              error={errors?.chassisNumber}
              hasError={submitted && errors?.chassisNumber}
              label="Chassis Number"
              onInput={this.handleChassisNumberChange}
              readonly={_id}
              type="number"
              value={this.state.chassisNumber}
            />
            <vm-select
              error={errors?.type}
              hasError={submitted && errors?.type}
              label="Type"
              onInput={this.handleTypeChange}
              readonly={_id}
              ref={this.typeInput}
              value={this.state.type}
            />
            <vm-input
              label="Number Of Passengers"
              readonly
              value={this.state.numberOfPassengers}
            />
            <vm-input
              label="Color"
              hasError={submitted && errors?.color}
              error={errors?.color}
              onInput={this.handleColorChange}
              type="color"
            />
            <div className="form-group">
              <button type="submit" disabled={submitting} className="btn btn-primary">
                Submit
              </button>
              {submitting && <vm-progress height="32" />}
            </div>
          </form>
        </div>
      </div>
    );
  }

  public componentDidUpdate() {
    this.renderTypeOptions();
  }

  public async componentDidMount() {
    const { id } = this.props.match.params;

    try {
      this.setState({ loading: true });
      if (id) {
        const { body: vehicle } = await apiClient.get(`vehicles/${id}`);
        this.setState({ ...vehicle });
      }
      this.setState({ loading: false });
    } catch (e) {
      alert("Could not find Vehicle");
    }

    this.renderTypeOptions();
  }

  private renderTypeOptions() {
    const options = this.state._id
      ? (
        <option value={this.state.type}>{this.state.type}</option>
      )
      : (
        <>
          <option></option>
          <option value={VehicleType.BUS}>Bus</option>
          <option value={VehicleType.CAR}>Truck</option>
          <option value={VehicleType.TRUCK}>Truck</option>
        </>
      );

    setTimeout(() => ReactDOM.render(options, this.typeInput.current!.querySelector("select")));
  }

  private handleChassisNumberChange =
    (e: any) => this.setState({ chassisNumber: e.currentTarget.value })

  private handleChassisSeriesChange =
    (e: any) => this.setState({ chassisSeries: e.currentTarget.value })

  private handleTypeChange =
    (e: any) => this.setState({ type: e.currentTarget.value })

  private handleColorChange =
    (e: any) => this.setState({ color: e.currentTarget.value })

  private handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { _id: id, ...vehicle } = this.state;
      const errors = validate(vehicle, constraints);
      this.setState({ submitting: true, submitted: true, errors });

      if (!errors) {
        const response = id
          ? await apiClient.put(`/vehicles/${id}`, vehicle)
          : await apiClient.post("/vehicles", vehicle);

        alert("Success");

        this.setState(response.data);
      }
    } catch (e) {
      alert("Error: " + JSON.stringify(e?.response?.data ?? "Unknown"));
    } finally {
      this.setState({ submitting: false });
    }
  }
}
