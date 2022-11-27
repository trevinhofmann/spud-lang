# Functions

## Function Definitions

* Functions begin with the `function` keyword.
* Function names follow the same rules as variable names.
* Parameters are defined after the `+` character, and their types are specified after the `:` character
* The value of a returned type is defined after the `>` character.
* Values are returned using the `return` keyword.

```spud
function maximum
  + left: int
  + right: int
  > int

  if left > right
    return left
  else
    return right
```

## Function Calls

```spud
int max = maximum(x, y)
```