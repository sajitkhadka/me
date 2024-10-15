"use client";
import { motion } from 'framer-motion';
import React from 'react';

const Underline = () => {
    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: '2rem' }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="h-1 bg-gray-900"
        ></motion.div>
    );
};

export default Underline;