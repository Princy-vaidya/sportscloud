import React, { Component } from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import {COLORS, FONT, HEIGHT, WIDTH, IMAGE_URL} from '../../Utils/constants';

class Avatar extends Component {
  static propTypes = {
    img: Image.propTypes.source,
    placeholder: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    roundedImage: PropTypes.bool,
    roundedPlaceholder: PropTypes.bool
  };

  static defaultProps = {
    roundedImage: true,
    roundedPlaceholder: true
  };

  renderImage = () => {
    const { img, width, height, roundedImage } = this.props;
    const { imageContainer, image } = styles;

    const viewStyle = [imageContainer];
    if (roundedImage)
      viewStyle.push({ borderRadius: Math.round(width + height) / 2 });
    return (
      <View style={viewStyle}>
        <Image style={image} source={img} />
      </View>
    );
  };

  renderPlaceholder = () => {
    const { placeholder, width, height, roundedPlaceholder } = this.props;
    const { placeholderContainer, placeholderText } = styles;

    const viewStyle = [placeholderContainer];
    if (roundedPlaceholder)
      viewStyle.push({ borderRadius: Math.round(width + height) / 2 });

    return (
      <View >
        <View style={{ backgroundColor: COLORS.GRAY,
    borderRadius: 30,width:50}} >
          <Text
             style={{ padding: 15,
                paddingHorizontal: 20,
                
                fontSize: FONT.SIZE.LARGE,}}
          >
            {placeholder.charAt(0).toUpperCase()}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const { img, width, height } = this.props;
    const { container } = styles;
    return (
    //   <View style={[container, this.props.style, { width, height }]}>
    //     {img ? this.renderImage() : this.renderPlaceholder()}
    //   </View>
    this.renderPlaceholder()
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  imageContainer: {
    overflow: "hidden",
    justifyContent: "center",
    height: "100%"
  },
  image: {
    flex: 1,
    alignSelf: "stretch",
    width: undefined,
    height: undefined
  },
  placeholderContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dddddd",
    height: "100%"
  },
  placeholderText: {
    fontWeight: "700",
    color: "#ffffff"
  }
});

export default Avatar;