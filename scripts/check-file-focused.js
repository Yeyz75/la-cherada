#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Script para verificar un archivo específico con filtrado de errores
 * Uso: node scripts/check-file-focused.js <archivo>
 */

import { execSync } from 'child_process'
import { existsSync } from 'fs'
import path from 'path'

const filePath = process.argv[2]

if (!filePath) {
  console.error('❌ Error: Debes proporcionar la ruta del archivo')
  console.log('Uso: npm run check-focused <archivo>')
  console.log('Ejemplo: npm run check-focused src/pages/UserProfilePage.vue')
  process.exit(1)
}

if (!existsSync(filePath)) {
  console.error(`❌ Error: El archivo ${filePath} no existe`)
  process.exit(1)
}

const fileName = path.basename(filePath)
const normalizedPath = filePath.replace(/\\/g, '/')

console.log(`🎯 Verificación enfocada: ${fileName}`)
console.log('='.repeat(60))

let hasErrors = false

try {
  // 1. Verificar con ESLint
  console.log('📋 ESLint (sintaxis y reglas)...')
  try {
    execSync(`npx eslint "${filePath}" --format=stylish`, { stdio: 'inherit' })
    console.log('✅ ESLint: Sin errores')
  } catch (error) {
    console.log('❌ ESLint: Errores encontrados')
    hasErrors = true
  }

  console.log('')

  // 2. Verificar tipos con TypeScript (filtrado)
  console.log('🔧 TypeScript (errores de tipos)...')
  try {
    execSync('npx vue-tsc --noEmit', {
      stdio: 'pipe',
      cwd: process.cwd()
    })
    console.log('✅ TypeScript: Sin errores de tipos en todo el proyecto')
  } catch (error) {
    const errorOutput =
      error.stdout?.toString() || error.stderr?.toString() || ''
    const lines = errorOutput.split('\n')

    // Filtrar errores específicos del archivo
    const fileErrors = lines.filter(line => {
      const cleanLine = line.trim()
      return (
        cleanLine.includes(normalizedPath) ||
        (cleanLine.includes('error TS') &&
          lines[lines.indexOf(line) - 1]?.includes(normalizedPath))
      )
    })

    if (fileErrors.length > 0) {
      console.log(`❌ TypeScript: Errores en ${fileName}:`)
      console.log('')
      fileErrors.forEach(line => {
        if (line.trim()) {
          // Resaltar el archivo y el error
          const highlighted = line
            .replace(normalizedPath, `📄 ${fileName}`)
            .replace(/error TS\d+:/g, '🚨 $&')
          console.log(`   ${highlighted}`)
        }
      })
      hasErrors = true
    } else {
      console.log(`✅ TypeScript: Sin errores en ${fileName}`)
      console.log('ℹ️  (Puede haber errores en otros archivos del proyecto)')
    }
  }

  console.log('')
  console.log('='.repeat(60))

  if (hasErrors) {
    console.log(`❌ ${fileName}: Errores encontrados`)
    console.log('')
    console.log('💡 Comandos útiles:')
    console.log(`   npm run lint -- --fix "${filePath}"  # Arreglar ESLint`)
    console.log(
      '   npm run type-check                   # Ver todos los errores de tipos'
    )
    process.exit(1)
  } else {
    console.log(`✅ ${fileName}: Sin errores`)
  }
} catch (error) {
  console.error('❌ Error durante la verificación:', error.message)
  process.exit(1)
}
