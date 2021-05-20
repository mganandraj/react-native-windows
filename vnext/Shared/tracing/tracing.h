#pragma once

// forward declaration.
namespace facebook {
namespace jsi {
class Runtime;
struct RuntimeHolderLazyInit;
}
} // namespace facebook

namespace facebook {
namespace react {
namespace tracing {
void initializeETW(std::shared_ptr<jsi::RuntimeHolderLazyInit> runtimeHolder, facebook::react::JSIEngineOverride jsiEngine);
void initializeJSHooks(facebook::jsi::Runtime &runtime);

void log(const char *msg);
void error(const char *msg);
} // namespace tracing
} // namespace react
} // namespace facebook
