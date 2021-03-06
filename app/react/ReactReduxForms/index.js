import React from 'react';
import {Control} from 'react-redux-form';
import * as forms from 'app/Forms';

let Select = (props) => <Control.select component={forms.Select} {...props}/>;
let DatePicker = (props) => <Control component={forms.DatePicker} {...props}/>;
let DateRange = (props) => <Control.select component={forms.DateRange} {...props}/>;
let MultiSelect = (props) => <Control.select component={forms.MultiSelect} {...props}/>;
let MarkDown = (props) => <Control.text component={forms.MarkDown} {...props}/>;
let Nested = (props) => <Control.select component={forms.Nested} {...props}/>;
let NestedMultiselect = forms.NestedMultiselect;
let MultiDate = (props) => <Control.select component={forms.MultiDate} {...props}/>;
let MultiDateRange = (props) => <Control.select component={forms.MultiDateRange} {...props}/>;
let Numeric = (props) => <Control component={forms.Numeric} {...props}/>;
let NumericRange = (props) => <Control.select component={forms.NumericRange} {...props}/>;
let DropdownList = (props) => <Control.select component={forms.DropdownList} {...props}/>;
let IconSelector = (props) => <Control.select component={forms.IconSelector} {...props}/>;
let RadioButtons = (props) => <Control.select component={forms.RadioButtons} {...props}/>;
let Switcher = (props) => <Control.select component={forms.Switcher} {...props}/>;
let FormGroup = forms.FormGroup;

export {
  Select,
  FormGroup,
  DatePicker,
  DateRange,
  MultiSelect,
  MarkDown,
  Nested,
  NestedMultiselect,
  Numeric,
  NumericRange,
  MultiDate,
  MultiDateRange,
  DropdownList,
  IconSelector,
  RadioButtons,
  Switcher
};
