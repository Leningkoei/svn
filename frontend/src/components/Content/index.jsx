import React from "react";
import Bar from "./Bar";
import { connect } from "react-redux";
import Img from "./Img";
import Video from "./Video";
import Text from "./Text";
import style from "./style.scss";

export default connect(
  state => ({
    API: state.API,
    fileInfo: state.fileInfo
  }),
  { refreshRootDirectory: data => ({ type: "refreshRootDirectory", data }) }
)(class Content extends React.Component {
  render() {
    const name = this.props.fileInfo.name;
    const content = this.state.content;
    const isEdit = this.state.isEdit;
    const { isLangSelectorDisabled } = this.state;

    return (
      <div className={style.content}>
        <Bar
          name={name}
          isEdit={isEdit}
          noticeChangeLang={this.noticeChangeLang}
          noticeSave={this.noticeSave}
          isLangSelectorDisabled={isLangSelectorDisabled}
        />
        {content}
      </div>
    );
  };

  noticeChangeLang = lang => this.setState({ lang });
  noticeIsEdit = isEdit => this.setState({ isEdit });
  noticeTextChange = text => this.setState({ text });
  noticeSave = async () => {
    const method = this.props.API.changeFileText;
    const res = await method({
      path: this.props.fileInfo.path,
      text: this.state.text
    });

    if (!res.data.result) {
      alert(res.data.msg);
    } else {
      this.setState({ isEdit: false });

      this.props.refreshRootDirectory(res.data.content);
    };
  };

  getTextComponent = (content, disabled = false) => (<Text
    key={new Date()}
    disabled={disabled}
    content={content}
    noticeIsEdit={this.noticeIsEdit}
    noticeTextChange={this.noticeTextChange}
  />);

  state = {
    content: this.getTextComponent("", true),
    isEdit: false,
    text: "",
    isLangSelectorDisabled: false
  };

  async componentDidUpdate(props, state) {
    const API = this.props.API;
    const fileInfo = this.props.fileInfo;

    if (props.fileInfo !== fileInfo) {
      this.setState({
        isEdit: false,
        text: ""
      });

      const extension = fileInfo.name.split(".").pop();

      if (this.imgType.includes(extension)) {
        const content = <Img src={API.getImg(fileInfo.path)} />;

        this.setState({ content, isLangSelectorDisabled: true });

        return;
      };

      if (this.videoType.includes(extension)) {
        const content = <Video src={API.getImg(fileInfo.path)} />;

        this.setState({ content, isLangSelectorDisabled: true });

        return;
      };

      const res = await API.getFileContent({ path: fileInfo.path })
      const textComponent = this.getTextComponent(res.data);

      this.setState({ content: textComponent, isLangSelectorDisabled: false });
    };
  };

  imgType = [ "jpg", "png", "ico" ];
  videoType = [ "mp4", "webm" ];
});

