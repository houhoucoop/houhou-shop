import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './app/api/graphql/schema.graphql',
  documents: ['./app/api/graphql/queries.graphql'],
  generates: {
    './app/api/graphql/__generated__/types.ts': {
      plugins: ['typescript'],
    },
    './app/api/graphql/__generated__/documents.ts': {
      plugins: ['typescript-document-nodes'],
    },
    './app/api/graphql/__generated__/': {
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: 'types.ts',
        fileName: 'hooks',
        folder: '__generated__',
        extension: '.tsx',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        documentMode: 'external',
        importDocumentNodeExternallyFrom: '../__generated__/documents',
      },
    },
  },
  hooks: {
    afterOneFileWrite: ['prettier --write'],
  },
};

export default config;
