const pendingPromises = new Map();
let promiseId = 0;

class P extends Promise {
  constructor(executor) {
    const wrappedExecutor = (resolve, reject) => {
      const wrappedResolve = () => {
        this.clearFromPending();
        return resolve(...arguments);
      };
      const wrappedReject = () => {
        this.clearFromPending();
        return reject(...arguments);
      };
      
      return executor(wrappedResolve, wrappedReject);
    };

    super(wrappedExecutor);

    promiseId++;
    this.id = promiseId;
    pendingPromises.set(this.id, this);
    this.executor = executor;

    Error.captureStackTrace(this, P);
  }

  clearFromPending() {
    pendingPromises.delete(this.id);
  }
}

global.Promise = P;

function getPendingPromises() {
  return Array.from(pendingPromises.values()).map(promise => ({
    executor: promise.executor.toString(),
    stack: promise.stack
  }));
}

// Пример использования

async function test() {
  const pendingPromise1 = new Promise(resolve => setTimeout(resolve, 3000));
  const pendingPromise2 = new Promise(resolve => setTimeout(resolve, 5000));
  const pendingPromise3 = new Promise(() => {});

  console.log('Pending Promises:', Array.from(pendingPromises.values()).map(promise => promise.executor.toString()));
  
  await Promise.all([pendingPromise1, pendingPromise2]);

  console.log('Pending Promises:');
  getPendingPromises().forEach(({ executor, stack }) => {
    console.log(executor, stack);
  });
}

test();
