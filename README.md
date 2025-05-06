# Runner

## Install

```sh
deno install --allow-env --allow-write --allow-read --allow-run runner.ts
```

## Uninstall

```sh
deno uninstall runner
```

## Development

### Test

```sh
deno test --allow-env --allow-write --allow-read --allow-run
```

Testing for grep has not been implemented yet. 🚧 The test must be done
manually. 🚧

```sh
pushd tests
deno run --allow-env --allow-read ../runner.ts grep data

# Message returned by command
unit/setting.test.ts: 35:         const settingStubbed = new StubbedSettingLoader("tests/testdata");
testdata/test_file.csv: 0: data
testdata/test_file.rb: 1:   def data
testdata/test_file.rb: 6: puts TestFile.new.data
testdata/symlink_file.csv: 0: data

# Clean up
popd
```
