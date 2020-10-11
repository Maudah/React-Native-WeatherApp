import * as React from 'react';
import autoBind from 'react-autobind';
import { Text, View, Button, TouchableOpacity, Image } from 'react-native';


export default class AlertComponent extends React.Component {
  constructor() {
    super();
    autoBind(this);
  }
  render() {
    const { isOpen } = this.props;
    return (
      <View>
        {isOpen &&
          <View style={styles.modal}>
            <View style={[styles.modalContent]}>
              <View style={{
                display: 'flex',
                flexDirection: 'row', width: '100%'
              }}>
                <View style={{ marginStart: '90px' }} />
                <Text style={[styles.headerText, { alignSelf: 'center', marginVertical: 25 }]}>
                  {this.props.title}
                </Text>
                <View style={{ right: 0, marginLeft: '52px' }}>
                  <TouchableOpacity title={''} onPress={this.props.leave}>
                    <Image source={require(`../../img/close.png`)} style={styles.buttonImageIconStyle} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ borderBottomColor: '#e5e8ea', borderBottomWidth: 1, paddingTop: '10px' }} />
              <View style={styles.footer}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                  <View style={{ paddingHorizontal: '5px' }}>
                    <TouchableOpacity onPress={this.props.stayButton} style={styles.modalBlack}>
                      <Text style={styles.modalBlackText}>
                        {this.props.stayTitle}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View >
                <View style={{ flex: 3 }} />
              </View>
            </View>
          </View>}
      </View>
    );
  }
}

const styles = {
  modal: {
    zIndex: 2,
    width: '100vw',
    height: '100vh',
    overflow: 'visible',
    backgroundColor: 'rgba(8, 56, 108, 0.5)',
    position: 'absolute',
    marginTop: 15
  },
  modalContent: {
    flexDirection: 'column',
    width: '85vw',
    overflow: 'visible',
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingTop: '15px',
    boxShadow: '2px',
    borderRadius: 3,
    position: 'relative',
  },
  headerText: {
    fontSize: 14,
    fontFamily: 'Roboto,sans-serif',
    lineHeight: 16,
    textAlign: 'center',
    width: '225px',
    height: '24px',
    left: '90px',
    fontWeight: 'bold'
  },
  footer:
  {
    flexDirection: 'row',
    paddingVertical: '5px',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    justifyContent: 'center',
  },
  modalBlack: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 0,
    paddingHorizontal: 17,
    paddingVertical: 8,
    borderColor: 'black',
  },
  buttonImageIconStyle: {
    margin: 5,
    height: 15,
    width: 15,
    resizeMode: 'stretch',
  },
  modalBlackText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
};

