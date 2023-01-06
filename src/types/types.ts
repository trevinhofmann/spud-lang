// TODO: rename to VariableType
export enum Type {
  Boolean = 'Boolean',
  String = 'String',
  Undefined = 'Undefined',
  Uint = 'Uint',
  Int = 'Int',
  Uint8 = 'Uint8',
  Int8 = 'Int8',
  Uint16 = 'Uint16',
  Int16 = 'Int16',
  Uint32 = 'Uint32',
  Int32 = 'Int32',
  Uint64 = 'Uint64',
  Int64 = 'Int64',
}

const typeMap: Record<string, Type | undefined> = {
  boolean: Type.Boolean,
  string: Type.String,
  undefined: Type.Undefined,
  uint: Type.Uint,
  int: Type.Int,
  uint8: Type.Uint8,
  int8: Type.Int8,
  uint16: Type.Uint16,
  int16: Type.Int16,
  uint32: Type.Uint32,
  int32: Type.Int32,
  uint64: Type.Uint64,
  int64: Type.Int64,
};

export const readType = (characters: string): Type => {
  const type = typeMap[characters];
  if (type === undefined) {
    throw new Error(`Unable to read the variable type "${characters}"`);
  }
  return type;
};
