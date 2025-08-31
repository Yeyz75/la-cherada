#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Script para verificar un archivo específico con ESLint y TypeScript
 * Uso: node scripts/check-file.js <archivo>
 */

import { execSync } from 'child_process'
import { existsSync } from 'fs'
import path from 'path'

const filePath = process.argv[2]

if (!filePath) {
  console.error('❌ Error: Debes proporcionar la ruta del archivo')
  console.log('Uso: npm run check-file <archivo>')
  console.log('Ejemplo: npm run check-file src/pages/UserProfilePage.vue')
  process.exit(1)
}

if (!existsSync(filePath)) {
  console.error(`❌ Error: El archivo ${filePath} no existe`)
  process.exit(1)
}

const fileName = path.basename(filePath)
console.log(`🔍 Verificando archivo: ${fileName}`)
console.log('='.repeat(60))

let hasErrors = false

try {
  // 1. Verificar con ESLint (sintaxis y reglas)
  console.log('📋 Ejecutando ESLint (sintaxis y reglas)...')
  try {
    execSync(`npx eslint "${filePath}" --format=stylish`, { stdio: 'inherit' })
    console.log('✅ ESLint: Sin errores de sintaxis o reglas')
  } catch (error) {
    console.log('❌ ESLint: Errores de sintaxis o reglas encontrados')
    hasErrors = true
  }

  console.log('')

  // 2. Verificar tipos con TypeScript
  console.log('🔧 Verificando tipos con TypeScript...')
  try {
    console.log('🔍 Usando vue-tsc para verificación completa...')

    // Capturar la salida para filtrar errores del archivo específico
    execSync('npx vue-tsc --noEmit', {
      stdio: 'inherit',
      cwd: process.cwd()
    })
    console.log('✅ TypeScript: Sin errores de tipos')
  } catch (error) {
    console.log('❌ TypeScript: Errores de tipos encontrados')
    console.log(
      'ℹ️  Para ver errores específicos de este archivo, revisa la salida anterior'
    )
    hasErrors = true
  }

  console.log('')
  console.log('='.repeat(60))

  if (hasErrors) {
    console.log('❌ Verificación completada con errores')
    console.log('')
    console.log('💡 Comandos útiles:')
    console.log(
      '   npm run lint -- --fix <archivo>  # Arreglar errores de ESLint'
    )
    console.log('   npm run type-check               # Solo verificar tipos')
    console.log('   npm run fix                      # Arreglar formato y lint')
    process.exit(1)
  } else {
    console.log('✅ Verificación completada sin errores')
  }
} catch (error) {
  console.error('❌ Error durante la verificación:', error.message)
  process.exit(1)
}
