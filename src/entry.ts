#!/usr/bin/env node

/**
 * ponsRALPH CLI Entry Point
 *
 * The Autonomous Multi-Channel AI Development Agent
 */

import { runProgram } from './cli/program.js';

// Run the CLI
runProgram().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
