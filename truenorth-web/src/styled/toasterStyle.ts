import { ToastContainer } from "react-toastify";
import styled from "styled-components";

import "react-toastify/dist/ReactToastify.css";

export const ToasterContainer = styled(ToastContainer)`
  .Toastify__toast-theme--colored.Toastify__toast--success {
    background-color: #a6f4c5;
  }
  .Toastify__toast-container {
  }

  /** Used to define the position of the ToastContainer **/
  .Toastify__toast-container--top-left {
  }
  .Toastify__toast-container--top-center {
  }
  .Toastify__toast-container--top-right {
  }
  .Toastify__toast-container--bottom-left {
  }
  .Toastify__toast-container--bottom-center {
  }
  .Toastify__toast-container--bottom-right {
  }

  /** Classes for the displayed toast **/
  .Toastify__toast {
  }
  .Toastify__toast--rtl {
  }
  .Toastify__toast-body {
  }

  /** Used to position the icon **/
  .Toastify__toast-icon {
  }

  /** handle the notification color and the text color based on the theme **/
  .Toastify__toast-theme--dark {
  }
  .Toastify__toast-theme--light {
  }
  .Toastify__toast-theme--light.Toastify__toast--default {
  }
  .Toastify__toast-theme--light.Toastify__toast--info {
    background-color: #d1e9ff;
    color: #b2ddff;
    font-weight: bold;
  }
  .Toastify__toast-theme--light.Toastify__toast--success {
    background-color: #d1fadf;
  }
  .Toastify__toast-theme--light.Toastify__toast--warning {
    background-color: #fef0c7;
  }
  .Toastify__toast-theme--light.Toastify__toast--error {
    background-color: #fecdca;
  }

  .Toastify__toast-theme--colored.Toastify__toast--default {
  }
  .Toastify__toast-theme--colored.Toastify__toast--info {
  }
  .Toastify__toast-theme--colored.Toastify__toast--success {
  }
  .Toastify__toast-theme--colored.Toastify__toast--warning {
  }
  .Toastify__toast-theme--colored.Toastify__toast--error {
  }

  .Toastify__progress-bar {
  }
  .Toastify__progress-bar--rtl {
  }
  .Toastify__progress-bar-theme--light {
  }
  .Toastify__progress-bar-theme--dark {
  }
  .Toastify__progress-bar--info {
  }
  .Toastify__progress-bar--success {
  }
  .Toastify__progress-bar--warning {
  }
  .Toastify__progress-bar--error {
  }
  /** colored notifications share the same progress bar color **/
  .Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,
  .Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,
  .Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,
  .Toastify__progress-bar-theme--colored.Toastify__progress-bar--error {
  }

  /** Classes for the close button. Better use your own closeButton **/
  .Toastify__close-button {
  }
  .Toastify__close-button--default {
  }
  .Toastify__close-button > svg {
  }
  .Toastify__close-button:hover,
  .Toastify__close-button:focus {
  }
`;
