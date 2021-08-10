﻿var DataAwareCustomItem = (function () {
    var svgIcon = '<svg id="dataAwareItemIcon" viewBox="0 0 24 24"><path stroke="#ffffff" fill="#4842f4" d="M12 2 L2 22 L22 22 Z" /></svg>';    
    var dataAwareItemMetaData = {
        bindings: [{
            propertyName: 'dimensionValue',
            dataItemType: 'Dimension',
            displayName: 'Dimension',
            enableColoring: true
        }],
        customProperties: [{
            owner: DevExpress.Dashboard.Model.CustomItem,
            propertyName: 'backColorProperty',
            valueType: 'string',
            defaultValue: 'None'
        }],
        optionsPanelSections: [{
            title: 'Background',
            items: [{
                dataField: 'backColorProperty',
                label: { text: 'Backcolor' },
                template: DevExpress.Dashboard.Designer.FormItemTemplates.buttonGroup,
                editorOptions: {
                    items: [{ text: 'None' }, { text: 'Red' }, { text: 'Blue' }]
                }
            }]
        }],
        icon: 'dataAwareItemIcon',
        title: 'Data Aware Item'
    };
    function DataAwareItemViewer(model, $container, options) {
        DevExpress.Dashboard.CustomItemViewer.call(this, model, $container, options);
    }
    DataAwareItemViewer.prototype = Object.create(DevExpress.Dashboard.CustomItemViewer.prototype);
    DataAwareItemViewer.prototype.constructor = DataAwareItemViewer;

    DataAwareItemViewer.prototype.renderContent = function ($element, changeExisting) {
        var element = $element.jquery ? $element[0] : $element;
        while (element.firstChild)
            element.removeChild(element.firstChild);
        var clientData = this._getDataSource();
        clientData.forEach(function (item) {
            var div = document.createElement('div');
            div.style.color = item.color;
            div.innerText = item.dimensionDisplayText;
            element.appendChild(div);
        });
        element.style.background = this._getBackColorProperty();
    };

    DataAwareItemViewer.prototype._getDataSource = function () {
        var clientData = [];
        this.iterateData(function (dataRow) {
            clientData.push({
                dimensionDisplayText: dataRow.getDisplayText('dimensionValue')[0] || "",
                color: dataRow.getColor()[0]
            });
        });
        return clientData;
    };

    DataAwareItemViewer.prototype._getBackColorProperty = function () {
        switch (this.getPropertyValue('backColorProperty')) {
            case 'None': return "rgb(255,255,255)";
            case 'Red': return "rgb(255,220,200)";
            case 'Blue': return "rgb(135,206,235)";
        }
    };
    function DataAwareItem(dashboardControl) {
        DevExpress.Dashboard.ResourceManager.registerIcon(svgIcon);
        this.name = "dataAwareItem";
        this.metaData = dataAwareItemMetaData;
        this.createViewerItem = function (model, $element, content) {
            return new DataAwareItemViewer(model, $element, content);
        }
    }
    return DataAwareItem;
})();