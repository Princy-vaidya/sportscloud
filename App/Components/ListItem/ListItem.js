import React, { Component } from "react";
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  Platform,
  Animated,
  Image
} from "react-native";
import PropTypes from "prop-types";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {COLORS, FONT, HEIGHT, WIDTH, IMAGE_URL} from '../../Utils/constants';

class ListItem extends Component {
  static propTypes = {
    leftElement: PropTypes.element,
    title: PropTypes.string,
    description: PropTypes.string,
    rightElement: PropTypes.element,
    rightText: PropTypes.string,
    onPress: PropTypes.func,
    onMultipleSelectInvitaion:PropTypes.func,
    onDelete: PropTypes.func,
    onLongPress: PropTypes.func,
    disabled: PropTypes.bool,
    select:PropTypes.bool
  };

  renderRightAction = (iconName, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0]
    });

    const pressHandler = () => {
      const { onDelete } = this.props;
      if (onDelete) onDelete();
      this.close();
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <Text style={{ color: "#fff" }}>Delete</Text>
        </RectButton>
      </Animated.View>
    );
  };

  renderRightActions = progress => (
    <View style={{ width: 64, flexDirection: "row" }}>
      {this.renderRightAction("trash", "#ef5350", 64, progress)}
    </View>
  );

  renderRightActions = progress => (
    <View style={{ width: 64, flexDirection: "row" }}>
      {this.renderRightAction("trash", "#ef5350", 64, progress)}
    </View>
  );

  updateRef = ref => {
    this.swipeableRow = ref;
  };

  close = () => {
    this.swipeableRow.close();
  };

  render() {
    const {
      leftElement,
      title,
      description,
      rightElement,
      rightText,
      onPress,
      onLongPress,
      disabled,
      select,
      onMultipleSelectInvitaion
    } = this.props;

    const Component = onPress || onLongPress ? TouchableHighlight : View;

    const {
      itemContainer,
      leftElementContainer,
      rightSectionContainer,
      mainTitleContainer,
      rightElementContainer,
      rightTextContainer,
      titleStyle,
      descriptionStyle
    } = styles;

    return (
      // <Swipeable
      //   ref={this.updateRef}
      //   friction={1}
      //   renderRightActions={this.renderRightActions}
      // >
        <Component
          // onLongPress={onLongPress}
          disabled={disabled}
          underlayColor="#f2f3f5"
        >
          <View style={itemContainer}>
            {leftElement ? (
              <View style={leftElementContainer}>{leftElement}</View>
            ) : (
              <View />
            )}
            <View style={rightSectionContainer}>
              <View style={mainTitleContainer}>
                <Text style={{ fontSize: FONT.SIZE.MEDIUM,
    color: COLORS.TEXTCOLORS,
    marginLeft: 5,}}>{title}</Text>
                {description ? (
                  <Text style={[descriptionStyle,{marginLeft:5}]}>{description}</Text>
                ) : (
                  <View />
                )}
              </View>
              <View style={rightTextContainer}>
                {rightText ? <Text>{rightText}</Text> : <View />}
              </View>

              {rightElement ? (
                <View style={rightElementContainer}>{rightElement}</View>
              ) : (
                <View />
              )}
              <TouchableOpacity
              onPress={onMultipleSelectInvitaion}>
              {!select?
     <View
        style={styles.selectBox}
      />:
       <View
        style={styles.selectBox}
      >
        <Image source={require('../../Assets/Album/select.png')} 
         style={styles.select}/>
      </View>
      }
      </TouchableOpacity>
            </View>
           
          </View>
          
        </Component>
      // </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    minHeight: 44,
    height: 63,
    marginVertical:5
  },
  leftElementContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
    paddingLeft: 13
  },
  rightSectionContainer: {
    marginLeft: 18,
    flexDirection: "row",
    flex: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#515151"
  },
  mainTitleContainer: {
    justifyContent: "center",
    flexDirection: "column",
    flex: 1
  },
  rightElementContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.4
  },
  rightTextContainer: {
    justifyContent: "center",
    marginRight: 10
  },
  titleStyle: {
    fontSize: 16
  },
  descriptionStyle: {
    fontSize: 14,
    color: "#515151"
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  selectBox:{
    width: 20,
    height: 20,
    backgroundColor: COLORS.GRAY,
    alignSelf: 'center',
    justifyContent:'center',
    marginTop:20
  },
  select:{
    width:13,
    height:13,
    alignSelf:'center'
  },
});

export default ListItem;