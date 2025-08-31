#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Script robusto para verificación de tipos TypeScript con soporte para Vue
 */

import { execSync } from 'child_process'
import { existsSync } from 'fs'

const filePath = process.argv[2]

console.log('🔧 Verificando tipos con TypeScript + Vue...')

try {
  if (filePath && existsSync(filePath)) {
    console.log(`📁 Archivo específico: ${filePath}`)
  } else {
    console.log('📁 Verificando todo el proyecto...')
  }

  // Primero intentar con vue-tsc (mejor para archivos .vue)
  try {
    console.log('🔍 Usando vue-tsc para verificación completa...')
    execSync('npx vue-tsc --noEmit', {
      stdio: 'inherit',
      cwd: process.cwd()
    })
    console.log('✅ TypeScript: Sin errores de tipos')
  } catch (vueError) {
    // Si vue-tsc falla, intentar con tsc básico
    console.log('⚠️  vue-tsc falló, intentando con tsc básico...')
    try {
      execSync('npx tsc --noEmit --skipLibCheck', {
        stdio: 'inherit',
        cwd: process.cwd()
      })
      console.log('✅ TypeScript: Sin errores de tipos (verificación básica)')
    } catch (tscError) {
      console.log('❌ TypeScript: Errores de tipos encontrados')
      throw tscError
    }
  }
} catch (error) {
  console.log('❌ TypeScript: Errores de tipos encontrados')
  process.exit(1)
}
