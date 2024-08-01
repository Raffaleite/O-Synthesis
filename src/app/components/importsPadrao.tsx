import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SlArrowDown } from "react-icons/sl";
import axios from 'axios';
import validator from 'validator';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/esm/Col";
import Navs from "./navbar";
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-modal';

const imports = {
    React, useEffect, useState, motion, AnimatePresence, useForm, Link, useRouter, SlArrowDown, axios, Form, Container, Row, Col, Navs, PropTypes, Card, FloatingLabel, Modal, validator
};

export default imports;