import { AbstractVehicle } from "@vehicle-manager/api";
import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { apiClient } from "../apiClient";

interface Params {
  id?: string;
}

type Props = RouteComponentProps<Params>;

interface State {
  vehicles?: AbstractVehicle[];
  loading?: boolean;
}

export class ListPage extends React.Component<Props, State> {
  public state: State = {};

  public render() {
    const { loading, vehicles } = this.state;

    let content = null;

    if (loading) {
      content = <vm-progress size={32} />;
    } else if (!vehicles?.length) {
      content = <vm-alert message="No vehicles found" />;
    } else {
      content = (
        <table className="table">
          <thead>
            <tr>
              <th>Chassis Series</th>
              <th>Chassis Number</th>
              <th>Type</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v._id}>
                <td>{v.chassisSeries}</td>
                <td>{v.chassisNumber}</td>
                <td>{v.type}</td>
                <td>{v.color}</td>
                <td>
                  <div className="btn-group" role="group">
                    <a className="btn btn-info" href={`/edit/${v._id}`}>
                      <span className="glyphicon glyphicon-pencil" aria-hidden="true" />
                    </a>
                    <button className="btn btn-danger" data-id={v._id} onClick={this.handleDelete}>
                      <span className="glyphicon glyphicon-trash" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Vehicles
        </div>
        <div className="panel-body">
          {content}
        </div>
      </div>
    );
  }

  public componentDidMount() {
    this.refresh();
  }

  private async refresh() {
    const search = new URLSearchParams(location.search);
    const q = search.get("q");

    try {
      this.setState({ loading: true });
      const { data: vehicles } = await apiClient.get("vehicles?" + (q ? `chassisNumber=${q}` : ""));
      this.setState({ vehicles });
    } finally {
      this.setState({ loading: false });
    }
  }

  private handleDelete = async (e: any) => {
    const id = e.target.dataset.id;
    if (!confirm("Are you sure to delete?")) {
      return;
    }
    try {
      await apiClient.delete(`vehicles/${id}`);
      alert("Success");
    } catch (e) {
      alert("Error: " + JSON.stringify(e?.response?.data ?? "Unknown"));
    } finally {
      this.refresh();
    }
  }
}
