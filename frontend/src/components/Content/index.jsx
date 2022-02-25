import { Input } from "antd";
import React from "react";
import Bar from "./Bar";
import { connect } from "react-redux";
import style from "./style.scss";

export default connect(
  state => ({
    API: state.API,
    fileInfo: state.fileInfo
  }),
  {}
)(class Content extends React.Component {
  render() {
    const name = this.props.fileInfo.name;
    const content = this.state.content;

    return (
      <div className={style.content}>
        <Bar name={name} />
        {content}
      </div>
    );
  };

  state = {
    content: <Input.TextArea disabled={true} />
  };

  async componentDidUpdate(props, state) {
    const API = this.props.API;
    const fileInfo = this.props.fileInfo;

    if (props.fileInfo !== fileInfo) {
      const extension = fileInfo.name.split(".").pop();

      if (this.imgType.includes(extension)) {
        const content = <img src={API.getImg(fileInfo.path)} />;

        this.setState({ content });

        return;
      };

      const res = await API.getFileContent({ path: fileInfo.path })
      const content = (<Input.TextArea
        disabled={true}
        value={res.data}
      />);

      this.setState({ content });
    };
  };

  imgType = [ "ico" ];
});

