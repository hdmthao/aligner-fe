import React, { Component } from "react";
import "./statistics.css";
import { connect } from "react-redux";
import StatisTable from "./StatisTable";
import StatisController from "./StatisController";
import { createAction } from "../../Redux/Action";
import { FETCH_STATIS_SUMARY } from "../../Redux/Action/type";
import { dataService } from "../../Services";

class Statistics extends Component {
  state = {
    searchValue: "",
    lang: "en",
    queryData: [],
  };
  componentDidMount() {
    //   FETCH DATA - SUMARY
    dataService
      .fetchStatistic_total()
      .then((response) => {
        this.props.dispatch(createAction(FETCH_STATIS_SUMARY, response.data));
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  // Updating: setState for data
  static getDerivedStateFromProps(props, state) {
    if (props.statisData !== state.statisData) {
      return {
        sumaryData: props.sumaryData,
      };
    }
    return null;
  }
  setLang = (lang) => {
    this.setState({
      lang: lang,
    });
  };
  handleQueryData = (data) => {
    this.setState({
      queryData: data,
    });
  };
  render() {
    let searchValue = this.state.searchValue.trim().toLowerCase();
    let queryData = this.state.queryData;
    if (searchValue.length >= 0) {
      queryData = queryData.filter((item) =>
        item.word.toLowerCase().match(searchValue)
      );
    }
    let sumaryData = null;
    if (this.props.sumaryData.length !== 0) {
      if (this.state.lang === "en") {
        sumaryData = (
          <div className="col-12">
            <ul>
              <li>
                Total word types:{" "}
                <span className="text-danger font-weight-bold">
                  {this.props.sumaryData[0][3]}
                </span>
              </li>
              <li>
                Total word token:{" "}
                <span className="text-danger font-weight-bold">
                  {this.props.sumaryData[0][1]}
                </span>
              </li>
              <li>
                Total sentences:{" "}
                <span className="text-danger font-weight-bold">
                  {this.props.sumaryData[0][2]}
                </span>
              </li>
            </ul>
          </div>
        );
      } else {
        sumaryData = (
          <div className="col-12">
            <ul>
              <li>
                Total word types:{" "}
                <span className="text-danger font-weight-bold">
                  {this.props.sumaryData[1][3]}
                </span>
              </li>
              <li>
                Total word token:{" "}
                <span className="text-danger font-weight-bold">
                  {this.props.sumaryData[1][1]}
                </span>
              </li>
              <li>
                Total sentences:{" "}
                <span className="text-danger font-weight-bold">
                  {this.props.sumaryData[1][2]}
                </span>
              </li>
            </ul>
          </div>
        );
      }
    }

    return (
      <div className="statistics-section myContainer">
        {/* Search bar */}
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="What are you looking for?"
            onChange={this.onChangeHandler}
            name="searchValue"
            value={this.state.searchValue}
          />
          <button type="submit" className="searchButton">
            <i className="fa fa-search" />
          </button>
        </div>

        {/* Statistic query section */}
        <div className="row">
          {/* Table */}
          {/* Controller */}
          <div className="col-9">
            <StatisTable queryData={queryData} />
          </div>
          <div className="col-3">
            <div className="pl-1">{sumaryData}</div>
            <StatisController
              setLang={this.setLang}
              queryData={this.handleQueryData}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sumaryData: state.Data.sumaryData,
  };
};

export default connect(mapStateToProps)(Statistics);
