import React, { Component } from 'react';
import Loader from './../components/loader';

const withData = (getData) => (View) => {
  return class extends Component {

    state = {
      data: null,
      loading: true,
      error: false
    };

    componentDidMount() {
      this.setState( {
        loading: true,
        error: false
      });

      getData(this.props)
        .then((data) => {
          this.setState({
            data,
            loading: false
          });
        })
        .catch(() => {
          this.setState({
            error: true,
            loading: false
          });
        });
    }

    render() {
      const { data, loading, error } = this.state;

      if (loading) {
        return <Loader />;
      }

      if (error) {
        return <div>Something has gone terribly wrong</div>;
      }

      return <View {...this.props} data={data} />;
    }
  };
};

export default withData;