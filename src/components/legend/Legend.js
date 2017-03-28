import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator'
import cssmodules from 'react-css-modules';

//import styles from './legend.cssmodule.scss';
import styles from './legendInlineStyles.js';

@autobind
class Legend extends PureComponent {
  constructor(props) {
    super(props)
  }

  _initialise() {
    const { legends, mapId } = this.props;
    const { fetchLegend } = this.props.actions;
    const legend = legends[mapId];

    if (!legend) {
      return;
    }

    legend.forEach(lyr => {
      if (lyr.url && !lyr.isFetching && !lyr.alreadyLoaded) {
        fetchLegend(lyr.url, mapId);
      }
    });
  };

  componentDidMount() {
    this._initialise();
  }

  componentDidUpdate(prevProps, prevState) {
    this._initialise();
  }

  renderSubNodeLegendData(item) {
    const imageStyle = {
      width: item.imageWidth + 8,
      height: item.imageHeight,
      backgroundImage: 'url(data:image/png;base64,' + item.image + ')',
      backgroundRepeat: 'no-repeat',
      display: 'inline-block'
    };

    const marginStyle = { marginLeft: 16, marginTop: 6 };

    return (
      <div key={item.id} style={marginStyle}>
        <div style={imageStyle} />
        <label style={styles.textStyle}>{item.label}</label>
      </div>
    );
  }

  renderSubNodes(item) {
    const { mapId, scales } = this.props
    const {
      toggleNodeExpanded,
      toggleNodeVisible
    } = this.props.actions;

    const currentScale = scales[mapId];

    let marginStyle = { marginLeft: 8, opacity: 1 };

    let subLayerLegendData = item.expanded && item.subLayerLegendData
      ? item.subLayerLegendData.map(this.renderSubNodeLegendData)
      : null;

    if (
      currentScale &&
      item.subLayerScaleRestricted &&
      ((item.subLayerMinScale !== 0 && item.subLayerMinScale < currentScale) ||
        (item.subLayerMaxScale !== 0 && item.subLayerMaxScale > currentScale))
    ) {
      marginStyle.opacity = 0.5;
    }

    let subNodeExpander = !item.subLayerLegendData
      ? null
      : <div onClick={() => toggleNodeExpanded(item.id, mapId)} style={styles.clickLegendNode}>
          {item.expanded
            ? <span className="esri-icon-down" />
            : <span className="esri-icon-right" />}
        </div>;

    let subNodeCheckbox = (
      <div style={styles.inlineBlockDisplay}>
        <div style={styles.inlineBlockDisplay}>
          <span
            style={item.visible ? styles.legendCheckboxSelected : styles.legendCheckbox}
            onClick={() => toggleNodeVisible(item.id, mapId)}
            className={item.visible ? 'esri-icon-radio-checked' : 'esri-icon-radio-unchecked'}
          />
          <label
            style={styles.legendCheckboxLabel}
            onClick={() => toggleNodeVisible(item.id, mapId)}>
            {item.subLayerName}
          </label>
        </div>
      </div>
    );

    return (
      <div key={item.id} style={marginStyle}>
        {subNodeExpander}{subNodeCheckbox}{subLayerLegendData}
      </div>
    );
  };

  renderNodes(item) {

    if (!item.alreadyLoaded) {
      return null;
    }

    const { mapId, options, scales} = this.props;
    const { toggleNodeExpanded, toggleNodeVisible } = this.props.actions;

    const currentScale = scales[mapId];

    const marginStyle = { marginLeft: 4, marginTop: 8, opacity: 1 };
    const subMarginStyle = { marginLeft: 8 };

    if (
      currentScale &&
      item.scaleRestricted &&
      ((item.minScale !== 0 && item.minScale < currentScale) ||
        (item.maxScale !== 0 && item.maxScale > currentScale))
    ) {
      if (options[mapId].showLayersNotVisibleForScale === false) {
        return null;
      }
      marginStyle.opacity = 0.4;
    }

    let sublayers = item.expanded && (item.legendLayers || item.hasDomNode)
      ? item.legendLayers
          ? item.legendLayers.map(this.renderSubNodes, this)
          : item.hasDomNode
              ? <div style={subMarginStyle} dangerouslySetInnerHTML={{ __html: item.domNode }} />
              : null
      : null;

    let topNodeExpander = !item.legendLayers && !item.hasDomNode
      ? null
      : <div onClick={() => toggleNodeExpanded(item.id, mapId)} style={styles.clickLegendNode}>
          {item.expanded
            ? <span className="esri-icon-down" />
            : <span className="esri-icon-right" />}
        </div>;

    let nodeCheckbox = (
      <div style={styles.inlineBlockDisplay}>
        <span
          style={item.visible ? styles.legendCheckboxSelected : styles.legendCheckbox}
          onClick={() => toggleNodeVisible(item.id, mapId)}
          className={item.visible ? 'esri-icon-radio-checked' : 'esri-icon-radio-unchecked'}
        />
        <label style={styles.legendCheckboxLabel} onClick={() => toggleNodeVisible(item.id, mapId)}>
          {item.layerName}
        </label>
      </div>
    );

    return (
      <div key={item.id} style={marginStyle}>
        {topNodeExpander}{nodeCheckbox}{sublayers}
      </div>
    );
  };

  render() {
    const { legends, options, mapId } = this.props;
    const {
      toggleExpanded,
      reverseLayerOrder,
      showLayersNotVisibleForScale,
      toggleShowSettings
    } = this.props.actions;
    const legend = legends[mapId];

    if (!legend) {
      return null;
    }

    const option = options[mapId];

    return (
      <div className="arcgis-legend">
        <div>
          <div style={styles.titleContainer}>
            <label>{mapId.split('-').join(' - ')}</label>
            {
              option
              ? <div style={styles.titleControls}>
                  <span
                    title='Expand all'
                    className="esri-icon-down-arrow"
                    style={{marginRight: 4}}
                    onClick={() => toggleExpanded(mapId, true)} />
                  <span
                    title='Collapse all'
                    className="esri-icon-right-triangle-arrow"
                    style={{ marginRight: 4}}
                    onClick={() => toggleExpanded(mapId, false)} />
                  <span
                    title='Options'
                    style={option.showOptions ? styles.optionsOn : styles.options}
                    className="esri-icon-settings"
                    onClick={() => toggleShowSettings(mapId)} />
                </div>
              : null
            }
          </div>
          {
            option && option.showOptions
            ? <div style={styles.settingsPanel}>
                <div style={styles.titleContainer}>
                  <label>Options</label>
                </div>
                <div style={styles.legendPadding}>
                  <div style={styles.marginTop}>
                    <span
                      style={styles.legendCheckboxSelected}
                      onClick={() => reverseLayerOrder(mapId)}
                      className={option.reverseLayerOrder ? 'esri-icon-checkbox-checked' : 'esri-icon-checkbox-unchecked'}
                    />
                    <label
                      style={styles.legendCheckboxLabel}
                      onClick={() => reverseLayerOrder(mapId)}>
                      Reverse order
                    </label>
                  </div>
                  <div style={styles.marginTop}>
                    <span
                      style={styles.legendCheckboxSelected}
                      onClick={() => showLayersNotVisibleForScale(mapId, !option.showLayersNotVisibleForScale)}
                      className={option.showLayersNotVisibleForScale ? 'esri-icon-checkbox-checked' : 'esri-icon-checkbox-unchecked'}
                    />
                    <label
                      style={styles.legendCheckboxLabel}
                      onClick={() => showLayersNotVisibleForScale(mapId, !option.showLayersNotVisibleForScale)}>
                      Show layers not visible for current scale
                    </label>
                  </div>
                </div>
              </div>
            :null
          }
        </div>
        <div style={styles.legendPadding}>
          {legend.map(this.renderNodes, this)}
        </div>
      </div>
    );
  }
}

Legend.displayName = 'Legend';
Legend.propTypes = {
  mapId: React.PropTypes.string.isRequired
};
Legend.defaultProps = {};

export default cssmodules(Legend, styles);
